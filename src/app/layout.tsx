'use client'
import {baselightTheme} from "@/utils/theme/DefaultColors";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LayoutContainer from "./layout/LayoutContainer";
import {SessionProvider} from "next-auth/react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider theme={baselightTheme}>
            <SessionProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <LayoutContainer>{children}</LayoutContainer>
            </SessionProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
