import BottomNav from "@/components/BottomNav";

export default function SettingsLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            {children}
            <BottomNav />
        </>
    )
}