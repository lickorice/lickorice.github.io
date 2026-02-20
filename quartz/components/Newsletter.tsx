import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Newsletter: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div className={`newsletter ${displayClass ?? ""}`}>
      <h3>Get updates via email</h3>
      <form
        action="https://api.follow.it/subscription-form/bE5yL1o3OW5zajM3UHBuNkRDSkVlVS8rSXRLQzVKdjhnejVJUXU0Vm4xR2lUUXdLT29xZ2NsbjFQVVpHa3BFSWFoZGlHL3NDbTM3bVhJWGM3RURMWDdiODBEYlFEQWhzcXN2MFlTdzdqZjZ4TWo2RE00bzZQZmlUWUFxdDJVTmJ8U0pZSWRWSjl5V1Jkbkd0eS9CU3JYaXlmckNGQUZucnJ5QTB4TkFTbzdEOD0=/8"
        method="post"
        target="_blank"
      >
        <div className="newsletter-inputs">
          <input type="email" name="email" placeholder="email@address.com" required />
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  )
}

export default (() => Newsletter) satisfies QuartzComponentConstructor
