interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const Navbar = ( { children }: Props ) => {
    return (
        <>
            <nav className="bg-gray-800 font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full">
                <div className="mb-2 sm:mb-0">
                    { children }
                </div>

            </nav>
        </>
    );
};
