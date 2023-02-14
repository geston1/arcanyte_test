<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\APIService;

class UserService extends APIService
{
    private UserRepository $userRepository;

    private EntityManagerInterface $entityManager;
    
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $entityManager, 
        UserPasswordHasherInterface $passwordHasher)
    {
        $this->userRepository   = $userRepository;
        $this->entityManager    = $entityManager;
        $this->passwordHasher   = $passwordHasher;
    }

    public function serialize(array $users): array
    {
        foreach ($users as &$user)
            $user = $user->getUsername();
        unset($user);

        return $users;
    }

    public function getAll(): array
    {
        return $this->userRepository->findAll();
    }

    public function get(string $username): ?User
    {
        return $this->userRepository->findOneBy(['username' => $username]);
    }

    public function exists(string $username): bool
    {
        $user = $this->userRepository->findOneBy(['username' => $username]);
        return isset($user);
    }

    public function register(string $username, string $password): bool 
    {
        if ($this->exists($username)) return false;

        $user = new User;

        $user->setUsername($username);
        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return true;
    }
}