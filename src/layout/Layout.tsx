import { Outlet } from "react-router";
const Layout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className="flex w-screen min-h-screen">
			Layout

			{children && <div className="flex flex-1">{children}</div>}
			<Outlet />
		</div>
	)
}

export default Layout
