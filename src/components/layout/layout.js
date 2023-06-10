import React from "react"
//import { GlobalStyle } from "../styles/GlobalStyle"
import "./layout.css"
import Header from "./Header"

function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
    </>
  )
}
export default Layout
