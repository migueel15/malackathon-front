const Layout = ({ children }: { children: any }) => {
	return (
		<div className="flex w-screen min-h-screen">
			Layout

			{children && <div className="flex flex-1">{children}</div>}
		</div>
	)
}

export default Layout
