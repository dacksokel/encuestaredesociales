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
    props: ['encuestado'],
    mounted() {
        console.log('datos encuestado ', this.encuestado)
        // setTimeout(() => {
        //     window.location.reload() //esto se ejecutara  una vez que sean guardado los datos  
        // }, 5000);
    }
}
</script>

<style>
</style>