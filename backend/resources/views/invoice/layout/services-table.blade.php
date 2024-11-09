<table class="table table-bordered table-hover mb-0 text-nowrap">
   <tbody>
         <tr id="tr-header-invoice-table">
            <th class="text-center"></th>
            <th>Item</th>
            <th class="text-end">Total</th>
         </tr>
         @foreach ($services as $key => $service)
            <tr>
               <td class="text-center">{{ ($key+1) }}</td>
               <td>
                  <p class="font-w600 mb-1">{{ $service->title }}</p>
                  <div class="text-muted">
                     <div class="text-muted">{!! nl2br($service->description) !!}</div>
                  </div>
               </td>
               <td class="text-end">${{ $service->price }}</td>
            </tr>    
         @endforeach
         <tr>
            <td colspan="2" class="text-uppercase text-end">Tax ({{ Auth::user()->settings->tax }}%)</td>
            <td class="text-end h4"><span id="total-invoice" style="font-size: 16px">${{ $tax }}</span></td>
         </tr>
         <tr>
            <td colspan="2" class="fw-bold text-uppercase text-end">Total</td>
            <td class="fw-bold text-end h4"><span id="total-invoice">${{ $total }}</span></td>
         </tr>
   </tbody>
</table>