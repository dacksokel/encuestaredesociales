<template>
    <div>
        <header>
            <h1>
                Bienvenido a la Encuestas de las redes Sociales
            </h1>
        </header>
        <section>
            <div>
                <button @click="$emit('start')">
                    Start Encuesta
                </button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: ['start'],
    data() {
        return {

        }
    },
    mounts() {
    },
    methods() {

    },
}
</script>

<style>
</style>