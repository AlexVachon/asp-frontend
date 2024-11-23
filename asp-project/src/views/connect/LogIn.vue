<template>
    <h1 class="center-header">
        S'identifier
    </h1>
    <div>
        <AuthForm class="auth-forms" :submit="onSubmit" :form-data="formData" :fields="fields" form-type="LogIn">
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
    <Notification ref="notification" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import AuthForm from '@/components/Forms/AuthForm.vue';
import Divider from '@/components/Tools/Divider.vue';
import Notification from '@/components/Tools/Notification.vue';

import type { TField } from '@/components/Types/types';

const router = useRouter();

const notification = ref<InstanceType<typeof Notification> | null>(null);

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

const onSubmit = () => {
    axios.post(
        `http://localhost:8000/api/users/auth/login`,
        {
            email: formData.value.email,
            password: formData.value.password
        }
    )
        .then((response) => {
            localStorage.setItem('authorization', `Bearer ${response.data.token}`)

            notification.value!.showToast({
                message: 'Vous êtes connecté avec succès.',
                variant: 'success',
                delay: 3000,
            });

            router.push({name: 'application'})
        })
        .catch((error) => {
            console.error("Erreur lors de la connexion: ", error)
            notification.value!.showToast({
                message: error.response.data.message,
                variant: 'danger',
                delay: 3000,
            });
        })
}
</script>