<?php

namespace App\Validator;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationList;

class PaymentValidator
{
    private ValidatorInterface $validator;

    private Assert\Collection $postConstraints;

    private Assert\Collection $putConstraints;

    private ConstraintViolationList $violationList;

    public function __construct(ValidatorInterface $validator) 
    {
        $this->validator = $validator;
        $this->postConstraints = new Assert\Collection([
            'username' => [
                new Assert\Type(['type' => 'string']),
                new Assert\NotNull()
            ],
            'credentials' => [
                new Assert\Type(['type' => 'string']),
                new Assert\NotNull()
            ],
            'amount' => [
                new Assert\Type(['type' => 'float']),
                new Assert\NotNull(),
                new Assert\GreaterThan(['value' => 0.1])
            ],
            'currency' => [
                new Assert\Type(['type' => 'string']),
                new Assert\NotNull(),
                new Assert\Length(['min' => 3, 'max' => 3])
            ],
            'status' => [
                new Assert\Type(['type' => 'bool']),
            ]
        ]);

        $this->putConstraints = new Assert\Collection([
            'uuid' => [
                new Assert\NotNull(),
            ],
            'status' => [
                new Assert\Type(['type' => 'bool']),
            ]
        ]);
    }
    
    public function getMessages(): array
    {
        foreach ($this->violationList as $violation)
            $messages[] = sprintf("%s: %s", trim($violation->getPropertyPath(),'[]'), $violation->getMessage());
        unset($this->violationList);

        return $messages ?? [];
    }

    public function validate(array $data, string $method)
    {
        switch ($method)
        {
            case 'POST':
                $this->violationList = $this->validator->validate($data, $this->postConstraints);
                return $this->violationList->count() == 0;
            case 'PUT':
                $this->violationList = $this->validator->validate($data, $this->putConstraints);
                return $this->violationList->count() == 0;
        }
    }
}