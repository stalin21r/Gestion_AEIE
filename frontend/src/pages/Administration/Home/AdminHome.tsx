import { LoboInicio } from '@/assets/images'
export default function AdminHome() {
  return (
    <section className="px-2 md:px-0 md:w-4/8 pt-8 space-y-4">
      <h1 className="text-4xl font-bold ">Bienvenido a AEIE</h1>
      <p className="text-lg font-light">
        Aquí puedes encontrar la tienda, los casilleros, el registro de
        asistencia y el horario de turnos.
      </p>
      <div className="flex items-center justify-center">
        <img
          className="rounded-xl w-full md:w-4/6 h-auto"
          src={LoboInicio}
          alt="Mascota de la Facultad de Ingeniería Electrónica con la bandera de la Asociación de Estudiantes durante la inauguración del torneo interfacultades en la Escuela Politécnica Nacional"
        />
      </div>
    </section>
  )
}
