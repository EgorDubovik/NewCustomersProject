<header>
   <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
         <a class="navbar-brand" href="#">
            <img src="{{ env('AWS_FILE_ACCESS_URL').$company->logo }}" alt="Logo" height="24" class="d-inline-block align-text-top">
            {{ $company->name }}
         </a>
         <span class="navbar-text">
            {{ $title }}
         </span>
      </div>
    </nav>
</header>