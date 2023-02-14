<?php

namespace App\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Service\UserService;

class UserController extends AbstractController
{
    #[Route('/api/users', name: 'app_api_users', methods: ['GET'])]
    public function index(UserService $userService): JsonResponse
    {
        $users = $userService->getAll();
        $json_users = $userService->serialize($users);
        $userService->setMessage($json_users);
        return $userService->getResponse();
    }
}
