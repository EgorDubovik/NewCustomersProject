<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>New Appointment Assigned</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f6f6f6;
				margin: 0;
				padding: 0;
				color: #333;
			}

			.container {
				max-width: 600px;
				background-color: #ffffff;
				margin: 30px auto;
				padding: 30px;
				border-radius: 8px;
				box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
			}

			.header {
				text-align: center;
				padding-bottom: 20px;
			}

			.header h2 {
				margin: 0;
				color: #2c3e50;
			}

			.content {
				font-size: 16px;
				line-height: 1.6;
			}

			.appointment-info {
				background-color: #f0f4f8;
				padding: 15px;
				border-radius: 6px;
				margin-top: 20px;
			}

			.appointment-info strong {
				display: inline-block;
				width: 140px;
			}

			.footer {
				text-align: center;
				font-size: 13px;
				color: #888;
				margin-top: 30px;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="header">
				<h2>New Appointment Assigned</h2>
			</div>

			<div class="content">
				<p>Hello {{ $techName ?? 'Technician' }},</p>

				<p>You have been assigned to a new appointment. Here are the details:</p>

				<div class="appointment-info">
					<p><strong>Date:</strong> {{ \Carbon\Carbon::parse($appointment->start)->format('F j, Y') }}</p>
					<p><strong>Time:</strong> {{ \Carbon\Carbon::parse($appointment->start)->format('g:i A') }}</p>
					<p><strong>Customer:</strong> {{ $appointment->job->customer->name }}</p>
					<p><strong>Address:</strong> {{ $appointment->job->address->full }}</p>
				</div>

				<p>Please make sure to review this appointment in your dashboard.</p>
			</div>

			<div class="footer">&copy; {{ date('Y') }} {{ $appointment->company->name ?? 'Your Company' }}. All rights reserved.</div>
		</div>
	</body>
</html>
