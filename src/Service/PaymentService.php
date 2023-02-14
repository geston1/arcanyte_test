<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

use App\Service\APIService;
use App\Repository\PaymentRepository;
use App\Validator\PaymentValidator;
use App\Entity\Payment;
use App\Entity\User;
use Symfony\Component\Uid\Uuid;

class PaymentService extends APIService
{
    private EntityManagerInterface $entityManager;

    private PaymentRepository $paymentRepository;

    private PaymentValidator $paymentValidator;

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

    public function serialize(array $payments): array
    {
        foreach ($payments as &$payment)
            $payment = [
                'uuid'          => $payment->getUuid(),
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

    public function update(array $data): void
    {
        $validated = $this->paymentValidator->validate($data, "PUT");
        $messages = $this->paymentValidator->getMessages();

        if (!$validated)
        {
            $this->setCode(400);
            $this->setMessage($messages);
            return;
        }

        $payment = $this->paymentRepository->findOneBy(['uuid' => $data['uuid']]);

        if (!$payment)
        {
            $this->setCode(400);
            $this->setMessage("uuid: Payment was not found");
            return;
        }
        else
        {
            $payment->setStatus($data['status']);
            $this->save($payment);
            $serialized = $this->serialize([$payment]);
            $this->setMessage($serialized);
        }
    }

    public function post(array $data, User $user = null): void
    {
        $validated = $this->paymentValidator->validate($data, "POST");
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
        $payment->setUuid(Uuid::v5(Uuid::v4(), serialize($payment)));

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