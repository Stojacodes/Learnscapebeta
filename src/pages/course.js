import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import CourseSection from "../components/sections/CourseSection"





function GeneratingPage() {
  return (
    <>
    <Layout>
     <CourseSection />
        <SEO title="Home" /> 
    </Layout>
    </>
  )
}

export default GeneratingPage