import { FaRegCheckCircle } from 'react-icons/fa'
import { FacebookPagePlugin } from '@/components'
import { useEffect, useState } from 'react'
import { Teleco, Autom, TI } from '@/assets/images'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { comoLlegar } from '@/assets/videos'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaArrowUp } from 'react-icons/fa'

const objetives: string[] = [
  'Promover el desarrollo académico y profesional de los estudiantes de Electrónica.',
  'Fomentar la integración estudiantil mediante actividades culturales, deportivas y sociales.',
  'Brindar espacios y recursos que contribuyan al bienestar y recreación de los estudiantes.',
  'Facilitar el acceso a materiales y equipos necesarios para el aprendizaje práctico.',
  'Impulsar proyectos innovadores que fortalezcan el sentido de comunidad y liderazgo.',
  'Establecer vínculos entre los estudiantes, la academia y la industria tecnológica.',
  'Ser un canal de representación y defensa de los intereses del estudiantado.'
]

export default function Home() {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const { ref: noticiasRef, inView: noticiasInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const { ref: carrersRef, inView: carrersInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const { ref: locationRef, inView: locationInView } = useInView({
    triggerOnce: true,
    threshold: 0.15
  })
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const toggleCard = (cardIndex: number) => {
    setFlippedCards(prev =>
      prev.includes(cardIndex)
        ? prev.filter(index => index !== cardIndex)
        : [...prev, cardIndex]
    )
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 70, behavior: 'smooth' })
  }
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300) // Mostrar después de 300px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      {/* about */}
      <section
        ref={aboutRef}
        className="w-12/13 mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-20 text-black"
      >
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -80 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-bold pb-10">Sobre la AEIE</h2>
          <p>
            La Asociación de Estudiantes de Ingeniería Electrónica (AEIE) es una
            organización estudiantil de carácter representativo, conformada por
            y para los estudiantes de las carreras de Electrónica,
            Telecomunicaciones, Tecnologías de la Información y Automatización
            de la Escuela Politécnica Nacional. Su finalidad principal es velar
            por los intereses del estudiantado, promoviendo su desarrollo
            integral dentro y fuera del ámbito académico.
          </p>
          <p>
            A través de diversas iniciativas, la AEIE impulsa espacios de
            participación, diálogo y acción colectiva que permiten fortalecer la
            vida universitaria. Se promueve el trabajo colaborativo, la
            excelencia académica y la formación complementaria mediante la
            organización de talleres, charlas técnicas, actividades culturales,
            deportivas y de bienestar.
          </p>
          <p>
            Uno de los pilares fundamentales de la AEIE es el acompañamiento al
            estudiante durante su trayectoria académica. Para ello, la
            asociación dispone de un espacio físico acogedor y equipado donde
            los estudiantes pueden relajarse, socializar y desconectarse del
            ritmo académico cotidiano.
          </p>
          <p>
            La AEIE reafirma su compromiso con la formación de profesionales
            íntegros, ofreciendo una plataforma donde el liderazgo estudiantil,
            la solidaridad y la innovación se conjugan para construir una
            comunidad más unida, activa y comprometida con su entorno.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold pb-10">Objetivos de la AEIE</h2>
          <ul className="space-y-4 text-lg">
            {objetives.map((objetive, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaRegCheckCircle className="text-xl" />
                <span>{objetive}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* news */}
      <section
        ref={noticiasRef}
        className="w-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center relative bg-[url('assets/images/parallax-bg.webp')]"
      >
        <div className="w-12/13 py-20 mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 text-white">
          <motion.section
            initial={{ opacity: 0, x: -80 }}
            animate={noticiasInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold pb-10">Noticias</h2>
            <p className="text-lg font-semibold">
              Aquí podrás encontrar los últimos post de nuestra pagina de
              facebook
            </p>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, x: 80 }}
            animate={noticiasInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="space-y-4 flex flex-col items-center justify-center"
          >
            <FacebookPagePlugin />
          </motion.section>
        </div>
      </section>

      {/* Careers Section */}
      <section ref={carrersRef} id="careers" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={carrersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Carreras de la AEIE
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={carrersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="text-xl text-gray-600"
            >
              Descubre las carreras que forman parte de Asociación de
              Estudiantes de Ingeniería Electronica de la Escuela Politécnica
              Nacional.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 max-w-7xl mx-auto">
            {/* Career Card 1 - Ingeniería en Sistemas */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={carrersInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="group h-96 [perspective:1000px]"
            >
              <div
                className={`relative h-full w-full rounded-none md:rounded-l-lg shadow-lg transition-all duration-700 [transform-style:preserve-3d] cursor-pointer ${
                  flippedCards.includes(0)
                    ? '[transform:rotateY(180deg)]'
                    : 'group-hover:[transform:rotateY(180deg)]'
                }`}
                onClick={() => toggleCard(0)}
              >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-none md:rounded-l-lg [backface-visibility:hidden]">
                  <img
                    src={Teleco}
                    alt="Imagen que representa la carrera de Ingeniería Electronica y Telecomunicaciones de la Escuela Politécnica Nacional"
                    className="absolute inset-0 w-full h-full object-cover rounded-none md:rounded-l-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-none md:rounded-l-lg"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Telecomunicaciones
                    </h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-none md:rounded-l-lg bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="p-8 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Telecomunicaciones
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Forma profesionales capaces de diseñar, operar y asegurar
                      redes y servicios de telecomunicaciones, aplicando
                      conocimientos científicos, éticos y tecnológicos para
                      resolver problemas complejos e impulsar soluciones
                      innovadoras.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li>• Redes y Comunicaciones</li>
                      <li>• Sistemas Inalámbricos y Ópticos</li>
                      <li>• Seguridad de Infraestructura</li>
                      <li>• Investigación e Innovación</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Career Card 2 - Ingeniería Industrial */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={carrersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="group h-96 [perspective:1000px]"
            >
              <div
                className={`relative h-full w-full shadow-lg transition-all duration-700 [transform-style:preserve-3d] cursor-pointer ${
                  flippedCards.includes(1)
                    ? '[transform:rotateY(180deg)]'
                    : 'group-hover:[transform:rotateY(180deg)]'
                }`}
                onClick={() => toggleCard(1)}
              >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                  <img
                    src={TI}
                    alt="Imagen que representa la carrera de Ingeniería Electronica y Tecnologías de la Información de la Escuela Politécnica Nacional"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Tecnologías de la Información
                    </h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="p-8 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Tecnologías de la Información
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Forma profesionales éticos y competentes en desarrollo
                      web, redes, bases de datos, seguridad, interacción
                      humano-máquina y gestión de información, capaces de
                      proponer soluciones tecnológicas innovadoras para
                      organizaciones y la sociedad.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li>• Desarrollo de Software</li>
                      <li>• Redes y Comunicaciones</li>
                      <li>• Bases de Datos</li>
                      <li>• Seguridad Informática</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Career Card 3 - Ciencia de Datos */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={carrersInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="group h-96 [perspective:1000px]"
            >
              <div
                className={`relative h-full w-full rounded-none md:rounded-r-lg shadow-lg transition-all duration-700 [transform-style:preserve-3d] cursor-pointer ${
                  flippedCards.includes(2)
                    ? '[transform:rotateY(180deg)]'
                    : 'group-hover:[transform:rotateY(180deg)]'
                }`}
                onClick={() => toggleCard(2)}
              >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full rounded-none md:rounded-r-lg [backface-visibility:hidden]">
                  <img
                    src={Autom}
                    alt="Imagen que representa la carrera de Ingeniería Electronica y Automatización de la Información de la Escuela Politécnica Nacional"
                    className="absolute inset-0 w-full h-full object-cover rounded-none md:rounded-r-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-none md:rounded-r-lg"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Electronica y Automatización
                    </h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full rounded-none md:rounded-r-lg bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="p-8 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Electronica y Automatización
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Forma profesionales capaces de diseñar, automatizar y
                      controlar sistemas industriales y comerciales, aplicando
                      soluciones electrónicas con criterios de eficiencia,
                      innovación, seguridad y sostenibilidad tecnológica.
                    </p>
                    <ul className="text-sm text-gray-500 space-y-2">
                      <li>• Automatización Industrial</li>
                      <li>• Electrónica de Potencia</li>
                      <li>• Instrumentación y Robótica</li>
                      <li>• Control de Procesos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Location Section */}
      <section
        ref={locationRef}
        className="py-20 w-full flex flex-col items-center justify-center overflow-hidden bg-cover bg-center relative bg-[url('assets/images/parallax-bg.webp')]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={locationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              ¿Cómo Llegar?
            </motion.h2>
            <motion.p
              className="text-xl text-blue-100"
              initial={{ opacity: 0, y: 40 }}
              animate={locationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            >
              Encuentra nuestra Asociación fácilmente
            </motion.p>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Column - Text */}
            <motion.div
              className="md:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -80 }}
              animate={locationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Nuestra Ubicación
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed font-semibold">
                  La Asociación de Estudiantes de Ingeniería Electronica se
                  encuentra ubicada en la planta baja del edificio 17
                  Química/Eléctrica, puedes acceder desde la entrara de la
                  facultad de Ingeniería en Sistemas o desde la entrada de la
                  facultad de Ingeniería Eléctrica y Electronica, te esperamos.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaLocationCrosshairs className="h-5 w-5 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">Dirección</h4>
                    <p className="text-blue-200 text-sm font-semibold">
                      Av. Ladrón de Guevara E11-253 170525 Quito, Ecuador
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-5 w-5 bg-green-400 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-white">Referencias</h4>
                    <p className="text-blue-200 text-sm font-semibold">
                      A nuestra izquierda se encuentra la Asociación de
                      Eléctrica y a nuestra derecha la asociación de
                      Agroindustria.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Video */}
            <motion.div
              className="md:col-span-3 relative rounded-lg overflow-hidden shadow-xl cursor-pointer"
              initial={{ opacity: 0, x: 80 }}
              animate={locationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
            >
              <video
                className="w-full h-auto rounded-lg"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={comoLlegar} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>

              <div className="absolute inset-0 bg-black/10 rounded-lg pointer-events-none"></div>

              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm select-none">
                Cómo llegar
              </div>
            </motion.div>
          </div>

          <motion.p
            className="text-center text-blue-200 text-sm mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={locationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
          >
            Visítanos, te esperamos electrónico.
          </motion.p>
        </div>
      </section>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="cursor-pointer fixed bottom-8 right-8 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 border-2 border-white hover:bg-sky-500 transition-all duration-300 hover:scale-110"
          aria-label="Ir al inicio"
          style={{
            filter: 'drop-shadow(0 0 2px #0077ff) drop-shadow(0 0 5px #0077ff)'
          }}
        >
          <FaArrowUp className="text-white text-xl" />
        </button>
      )}
    </>
  )
}
