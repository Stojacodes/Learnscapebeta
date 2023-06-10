import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import GeneratingSection from "../components/sections/GeneratingSection"





function GeneratingPage() {
  return (
    <>
    <Layout>
     <GeneratingSection />
        <SEO title="Home" /> 
    </Layout>
    </>
  )
}

export default GeneratingPage
