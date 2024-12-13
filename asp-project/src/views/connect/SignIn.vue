<template>
    <h1 class="center-header">
        S'inscrire
    </h1>
    <div>
        <AuthForm :fields="fields" :submit="onSubmit" :form-data="formData" class="auth-forms" form-type="SignIn">
            <template #footer>
                <Divider direction="horizontal" :width="80" />
                <div class="text-center my-4">
                    <b-button :to="{ name: 'login' }" variant="outline-primary" pill>
                        Se connecter
                    </b-button>
                </div>
            </template>
        </AuthForm>
    </div>
    <Notification ref="notification" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

import AuthForm from '@/components/Forms/AuthForm.vue';
import Divider from '@/components/Tools/Divider.vue';
import Notification from '@/components/Tools/Notification.vue';

import type { TField } from '@/components/Types/types';

const notification = ref<InstanceType<typeof Notification> | null>(null);

const formData = ref({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: ''
});

const fields: TField[] = [
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'xyz@address.com',
        description: 'Max. 50 caractères',
        rules: [
            {
                message: 'Ne peut être vide !',
                validate: (value: string) => !!value
            },
            {
                message: 'Votre adresse est trop longue',
                validate: (value: string) => value.length <= 50
            }
        ]
    },
    {
        name: 'first_name',
        type: 'text',
        label: 'Prénom',
        description: 'Min. 3 caractères et max. 50 caractères',
        rules: [
            {
                message: 'Ne peut être vide !',
                validate: (value: string) => !!value
            },
            {
                message: 'Votre prénom est trop long',
                validate: (value: string) => value.length <= 50
            },
            {
                message: 'Votre prénom est trop court',
                validate: (value: string) => value.length > 3
            }
        ]
    },
    {
        name: 'last_name',
        type: 'text',
        label: 'Nom de famille',
        description: 'Min. 3 caractères et max. 50 caractères',
        rules: [
            {
                message: 'Ne peut être vide !',
                validate: (value: string) => !!value
            },
            {
                message: 'Votre nom est trop long',
                validate: (value: string) => value.length <= 50
            },
            {
                message: 'Votre nom est trop court',
                validate: (value: string) => value.length > 3
            }
        ]
    },
    {
        name: 'password',
        type: 'password',
        label: 'Mot de passe',
        description: 'Min. 8 caractères et max. 20 caractères',
        rules: [
            {
                message: 'Ne peut être vide !',
                validate: (value: string) => !!value
            },
            {
                message: "Votre mot de passe n'est pas conforme !",
                validate: (value: string) => value.length >= 8 && value.length <= 20
            }
        ]
    },
    {
        name: 'confirm_password',
        type: 'password',
        label: 'Confirmer le mot de passe',
        rules: [
            {
                message: 'Ne peut être vide !',
                validate: (value: string) => !!value
            },
            {
                message: 'Les mots de passe ne correspondent pas !',
                validate: (value: string) => value === formData.value.password
            }
        ]
    }
]

const onSubmit = () => {
    axios.post(
        `http://localhost:8000/api/users/auth/signup`,
        {
            email: formData.value.email,
            first_name: formData.value.first_name,
            last_name: formData.value.last_name,
            password: formData.value.password
        }
    )
    .then((response) => {
        notification.value!.showToast({
            message: "Compte créé avec succès.",
            variant: 'danger',
            delay: 3000,
        });
    })
    .catch((error) => {
        console.error("Erreur lors de la creation du compte: ", error)
        notification.value!.showToast({
            message: error.response.data.message,
            variant: 'danger',
            delay: 3000,
        });
    })
}

</script>