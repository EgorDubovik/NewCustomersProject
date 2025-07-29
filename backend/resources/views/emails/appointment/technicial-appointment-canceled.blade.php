<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Appointment Canceled</title>
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
				<h2>Appointment Canceled</h2>
			</div>

			<div class="content">
				<p>Hello {{ $techName ?? 'Technician' }},</p>

				<p>Appointment has been canceled. Here are the details:</p>

				<div class="appointment-info">
					<p><strong>Date:</strong> {{ \Carbon\Carbon::parse($appointmentStart)->format('F j, Y') }}</p>
					<p><strong>Time:</strong> {{ \Carbon\Carbon::parse($appointmentStart)->format('g:i A') }}</p>
					<p><strong>Customer:</strong> {{ $customerName }}</p>
					<p><strong>Address:</strong> {{ $customerAddress }}</p>
				</div>

				<p>Please make sure to review this appointment in your dashboard.</p>
			</div>

			<div class="footer">&copy; {{ date('Y') }} {{ $companyName }}. All rights reserved.</div>
		</div>
	</body>
</html>
