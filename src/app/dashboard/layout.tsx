"use client"

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="h-screen my-4">
          {children}
      </div>
    </>
  )
}
