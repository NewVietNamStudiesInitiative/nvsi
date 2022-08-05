import React from "react"
import styles from "../styles/getinvolved/get-involved.module.css"
import Head from "next/head"
import { getTestimonials } from "../api-lib/apiOps"

function Card({ name, group, quote, pfp }) {
  return (
    <article className={styles.card}>
      <img src={pfp ?? "default.jpeg"} alt={`picture of ${name}`} />
      <div className={styles.cardInfo}>
        <h3>{name}</h3>
        {group && <h4>{group}</h4>}
        <br />
        <p>{quote}</p>
      </div>
    </article>
  )
}

export default function GetInvolved({ testimonials }) {
  return (
    <>
      <Head>
        <title>Get Involved | NVSI</title>
        <meta name="description" content="Get Involved" />
        <link rel="icon" href="/images/Navbar/logoSmall.svg" />
      </Head>

      <div className={styles.headerSection}>
        <h1>GET INVOLVED</h1>
        <p>Volunteer with us!</p>
      </div>
      <div className={styles.container}>
        <div className={styles.testimonials}>
          <h2>Testimonials</h2>
          <div className={styles.group}>
            {testimonials.map((test) => {
              return (
                <Card
                  key={test.id}
                  name={test.attributes.Name}
                  group={test.attributes.Group}
                  quote={test.attributes.Quote}
                  pfp={test.attributes.Image.data.attributes.url}
                />
              )
            })}
          </div>
        </div>
        <div className={styles.description}>
          <h2>Description</h2>
          <p>
            Thank you for your interest. Our volunteer internship team 
            actively promotes and advances the work done at NVSI. This 
            includes project management, organizing events, center development, 
            research, and writing. 
          </p>
          <p>
            If you would like to join, please fill out our intake form and 
            we will contact you within 48 hours.
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeyUMGKQ5OBrHkFEK94cyHntJfyGQQFLBzWaYn-VTuRzHs69A/viewform">
            <button>Apply Here</button>
          </a>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const testimonials = await getTestimonials()

  return {
    props: { testimonials },
    revalidate: 60,
  }
}
