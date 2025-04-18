export default function UnsupportedScreen() {
    return (
        <div className="sm:hidden flex h-screen w-full items-center justify-center bg-gray-100">
            <p className="text-center text-lg font-semibold px-4">
                This project is not compatible with small screens. Please use a larger device.
            </p>
        </div>
    );
}
