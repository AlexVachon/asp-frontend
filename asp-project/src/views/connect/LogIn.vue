<template>
    <h1 class="center-header">
        S'identifier
    </h1>
    <div>
        <Form class="forms" :fields="fields">
            <template #footer>
                <Divider direction="horizontal" :width="75"/>
                <div class="text-center my-4">
                <b-button class="" :to="{ name: 'sign' }" variant="outline-primary" pill>
                    S'inscrire
                </b-button>
                </div>
            </template>
        </Form>
    </div>

</template>
<script lang="ts" setup>
import Form from '@/components/Forms/Form.vue';
import type { TField } from '@/components/Types/types';
import Divider from '@/components/Tools/Divider.vue';

const fields: TField[] = [
    {
        name: 'email',
        type: 'email',
        label: "Email",
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