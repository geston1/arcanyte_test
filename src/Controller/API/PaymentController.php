<?php

namespace App\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\ConstraintViolationList;

use App\Entity\Payment;
use App\Service\PaymentService;
use App\Validator\PaymentValidator;
use App\Service\UserService;

class PaymentController extends AbstractController
{

    #[Route('/api/payments', name: 'app_api_payments', methods: ['GET'])]
    public function index(PaymentService $paymentService): JsonResponse
    {
        $payments = $paymentService->getAll();
        $json_payments = $paymentService->serialize($payments);
        $paymentService->setMessage($json_payments);
        return $paymentService->getResponse();
    }

    #[Route('/api/payment/{id}', name: 'app_api_payment', methods: ['GET'])]
    public function get(int $id, PaymentService $paymentService): JsonResponse
    {
        $payment = $paymentService->get($id);
        $json_payment = $paymentService->serialize([$payment]);
        $paymentService->setMessage($json_payments);
        return $paymentService->getResponse();
    }

    #[Route('/api/payment', name: 'app_api_payment_update', methods: ['PUT'])]
    public function put(Request $request, PaymentService $paymentService): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $paymentService->update($content);
        return $paymentService->getResponse();
    }

    #[Route('/api/payment', name: 'app_api_payment_add', methods: ['POST'])]
    public function post(Request $request, PaymentService $paymentService, UserService $userService): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $user = $userService->get($content["username"] ?? '');
        $paymentService->post($content, $user);

        return $paymentService->getResponse();
    }
}
