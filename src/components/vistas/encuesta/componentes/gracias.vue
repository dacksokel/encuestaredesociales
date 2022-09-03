<template>
    <div>
        <h1>
            Gracias {{ encuestado.nombre }} por realizar la encuesta
        </h1>
        <h3>
            se refrescara en 5s, puede tambien revisar la seccion de estatidistacas
        </h3>
    </div>
</template>

<script>
export default {
    props: ['encuestado',"done"],
    async mounted() {
        console.log('datos encuestado ', this.encuestado)
        let res = await fetch(`/encuestados/crearEncuestado`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.encuestado),
        });
        let dato = await res.json()
        console.log("🚀 ~ file: gracias.vue ~ line 26 ~ mounted ~ dato", dato)

        if(dato.respuesta){
            console.log('todo bien ')
        }
        setTimeout(() => {
            window.location.reload() //esto se ejecutara  una vez que sean guardado los datos  
        }, 5000);
    }
}
</script>

<style>
</style>