<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $job = $this->job;
        $customer = $job->customer;
        $firstAppointment = $job->appointments->first() ?? null;

        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'payment_type' => $this->payment_type,
            'type_text' => $this->type_text,
            'tech' => TechPaymentsResource::make($this->tech),
            'created_at' => $this->created_at,
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
            ],
            'appointment' => $firstAppointment ? [
                'id' => $firstAppointment->id,
                'start' => $firstAppointment->start,
            ] : null,
        ];
    }
}
