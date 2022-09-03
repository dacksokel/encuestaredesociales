<template>
    <div>
        <header>
            <h1>
                Gracias por participar en la Encuesta
            </h1>
            <h3>
                Por Favor ingresa tu nombre, correo, edad y sexo
            </h3>
        </header>
        <div>
            <form>
                <p>
                    <label for="fnombre">Nombre:</label><br>
                    <input type="text" id="fnombre" name="fnombre" v-model="nombre">
                </p>
                <p>
                    <label for="fcorreo">Correo:</label>
                    <input type="text" id="fcorreo" name="fcorreo" v-model="correo">
                </p>
                <p>
                    <label for="edad">Elija un Rango de su Edad:</label>
    
                    <select name="edad" id="edad" v-model="edadRango">
                        <option value="18-25">18-25</option>
                        <option value="26-33">26-33</option>
                        <option value="34-40">34-40</option>
                        <option value=" 40+"> 40+</option>
                    </select>
                </p>
                <p>
                    <label for="sexo">Sexo:</label>
    
                    <select name="sexo" id="sexo" v-model="sexo">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="nada">Prefiero no decir</option>
                    </select>
                </p>
            </form>
        </div>
        <div>
            <button @click="guardar_datos">Siguiente</button>
        </div>
    </div>
</template>

<script>
export default {
    props:["siguiente"],
    data(){
        return{
        nombre:'',
        edadRango:'',
        sexo:'',
        correo:''
    }
},
    mounted(){},
    methods:{
        guardar_datos(){ 
            //con esto tambien se le pasa del usuario al padre y con eso entonces podemos mantener un stado bbase 
            // que no es el ma scorrecto pero para no complicar las cosas con un gestor de stados esto es mas practico
            this.$emit('siguiente',this.nombre, this.correo, this.edadRango, this.sexo)            
        }
    }
}
</script>

<style>
</style>