export default function SpaceLayout({ children, modal, }: { children: React.ReactNode, modal: React.ReactNode; }) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}
