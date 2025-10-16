import { Outlet } from "react-router";
import Navbar from "../features/navbar/Navbar";
const Layout = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className="flex w-screen min-h-screen">
			<Navbar />
			<div className="flex flex-col flex-1 bg-bg p-5 md:ml-0">
				{children && <div className="flex flex-1">{children}</div>}
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
