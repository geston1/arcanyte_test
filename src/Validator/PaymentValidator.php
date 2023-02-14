<?php

namespace App\Validator;

use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationList;

class PaymentValidator
{
    private $validator;

    private $constraints;

    private $violationList;

    public function __construct(ValidatorInterface $validator) 
    {
        $this->validator = $validator;
        $this->constraints = new Assert\Collection([
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
    }
    
    public function getMessages(): array
    {
        foreach ($this->violationList as $violation)
            $messages[] = sprintf("%s: %s", trim($violation->getPropertyPath(),'[]'), $violation->getMessage());

        return $messages ?? [];
    }

    public function validate(array $data): bool
    {
        $this->violationList = $this->validator->validate($data, $this->constraints);
        return $this->violationList->count() == 0;
    }
}