import { Outlet } from "react-router";
import Navbar from "../features/navbar/Navbar";
const Layout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className="flex w-screen min-h-screen">
			<Navbar />
			{children && <div className="flex flex-1">{children}</div>}
			<Outlet />
		</div>
	)
}

export default Layout
