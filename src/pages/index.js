import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import HeroSection from "../components/sections/HeroSection"




function IndexPage() {
  return (
    <>
    <Layout>
        <HeroSection />
        <SEO title="Home" /> 
    </Layout>
    </>
  )
}

export default IndexPage

