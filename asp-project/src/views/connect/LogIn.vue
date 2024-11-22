<template>
    <h1 class="center-header">
        S'identifier
    </h1>
    <div>
        <AuthForm class="auth-forms" :form-data="formData" :fields="fields" form-type="LogIn">
            <template #footer>
                <Divider direction="horizontal" :width="80" />
                <div class="text-center my-4">
                    <b-button :to="{ name: 'sign' }" variant="outline-primary" pill>
                        S'inscrire
                    </b-button>
                </div>
            </template>
        </AuthForm>
    </div>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import AuthForm from '@/components/Forms/AuthForm.vue';
import type { TField } from '@/components/Types/types';
import Divider from '@/components/Tools/Divider.vue';

const formData = ref({
    email: '',
    password: ''
})


const fields: TField[] = [
    {
        name: 'email',
        type: 'email',
        label: "Email",
        required: true,
        placeholder: 'Entrez votre email',
        rules: [
            {
                message: 'Ne peut être vide !',
                validate: (value: string) => !!value
            }
        ]
    },
    {
        name: 'password',
        label: 'Mot de passe',
        type: 'password',
        required: true,
        placeholder: 'Entrez votre mot de passe',
        rules: [
            {
                message: 'Ne peut être vide !',
                validate: (value: string) => !!value
            }
        ]
    }
];

</script>