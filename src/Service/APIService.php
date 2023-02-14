<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;

class APIService
{
    protected $message = "";

    protected $code = 200;

    public function setMessage(array $message = []): void
    {
        $this->message = $message;
    }

    public function setCode(int $code): void
    {
        $this->code = $code;
    }

    public function getResponse(): JsonResponse
    {
        $response = new JsonResponse([
            'success'  => $this->code == 200,
            'code'     => $this->code,
            'message'  => $this->message
        ]);
        $response->setStatusCode($this->code);

        return $response;
    }
}