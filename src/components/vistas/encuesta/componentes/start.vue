<template>
    <div>
        <header>
            <h1>
                Bienvenido a la Encuestas de las redes Sociales
            </h1>
            <h3>
                para comenzar la prueba coloque su correo
            </h3>
        </header>
        <section>
            <div>
                <p>
                    <label for="fcorreo">Correo:</label>
                    <input type="email" id="fcorreo" name="fcorreo" v-model="correo" required>
                </p>
            </div>
            <div>
                <button @click="validarCorreo" class="btn btn-primary">
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
            correo:''
        }
    },
    mounts() {
    },
    methods: {
        validarCorreo(){
            if(this.correo.includes("@")){
                this.$emit("start",this.correo)
            }else{
                alert("ingrese un correo ejemplo: dacksokel@gmail.com")
            }
        }
    },
}
</script>

<style>
h1 {
    padding: 1em;
}

h3 {
    padding: .5em;
}

p {
    font-size: 30px;
    font-weight: bold;
}
</style>