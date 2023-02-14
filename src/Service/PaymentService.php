<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

use App\Service\APIService;
use App\Repository\PaymentRepository;
use App\Validator\PaymentValidator;
use App\Entity\Payment;
use App\Entity\User;

class PaymentService extends APIService
{
    private $entityManager;

    private $paymentRepository;

    private $paymentValidator;

    public function __construct(
        PaymentRepository $paymentRepository,
        EntityManagerInterface $entityManager,
        PaymentValidator $paymentValidator
    )
    {
        $this->paymentRepository    = $paymentRepository;
        $this->entityManager        = $entityManager;
        $this->paymentValidator     = $paymentValidator;
    }

    public  function serialize(array $payments): array
    {
        foreach ($payments as &$payment)
            $payment = [
                'username'      => $payment->getUser()->getUsername(),
                'credentials'   => $payment->getCredentials(),
                'amount'        => $payment->getAmount(),
                'currency'      => utf8_encode($payment->getCurrency()),
                'status'        => $payment->isStatus() ? "Оплачен" : "Не оплачен"
            ];
        unset($payment);

        return $payments;
    }

    public function getAll(): array
    {
        return $this->paymentRepository->findAll();
    }

    public function get(int $id): ?Payment
    {
        return $this->paymentRepository->find($id);
    }


    public function post(array $data, User $user = null): void
    {
        $validated = $this->paymentValidator->validate($data);
        $messages = $this->paymentValidator->getMessages();
        
        if (!$user)
        {
            $messages[] = "user: User not exists";
        }

        if (!$validated)
        {
            $this->setCode(400);
            $this->setMessage($messages);
            return;
        }

        $payment = new Payment();
        $payment->setUser($user);
        $payment->setCredentials($data['credentials']);
        $payment->setAmount($data['amount']);
        $payment->setCurrency($data['currency']);
        $payment->setStatus($data['status']);

        $serialized = $this->serialize([$payment]);
        $this->setMessage($serialized);
        
        $this->save($payment);
    }

    public function save(Payment $payment): void
    {
        $this->entityManager->persist($payment);
        $this->entityManager->flush();
    }
}