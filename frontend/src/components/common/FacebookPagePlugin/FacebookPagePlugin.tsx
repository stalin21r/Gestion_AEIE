import { useEffect } from 'react'

declare global {
  interface Window {
    FB: any
  }
}

export default function FacebookPagePlugin() {
  useEffect(() => {
    // Cargar el SDK si no está presente
    if (!window.FB) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.src =
        'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v18.0'
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse()
        }
      }
      document.body.appendChild(script)
    } else {
      window.FB.XFBML.parse()
    }
  }, [])

  return (
    <div className="my-6 flex justify-center w-full">
      <div className="w-[340px] max-w-full">
        <div
          className="fb-page"
          data-href="https://www.facebook.com/epn.aeie/"
          data-tabs="timeline"
          data-width="340"
          data-height="500"
          data-small-header="false"
          data-adapt-container-width="false"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/epn.aeie/"
            className="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/epn.aeie/">AEIE - EPN</a>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
