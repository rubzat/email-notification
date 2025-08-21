export const metadata = {
	title: 'Tecnocom',
	description: 'Sitio web de Tecnocom',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className="min-h-screen antialiased bg-white text-gray-900">
				{children}
			</body>
		</html>
	);
}