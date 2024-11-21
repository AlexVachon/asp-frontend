<template>
    <Loading :show="isLoading">
        <b-card class="shadow">
            <b-card-body>
                <b-form @submit.prevent="onSubmit" @reset="onReset">
                    <div v-for="(field, index) in fields" :key="index" class="mb-3">
                        <b-form-group :label="field.label" :description="field.description">
                            <b-form-input v-model="formData[field.name]" :type="field.type" :name="field.name" :required="field.required"
                                :placeholder="field.placeholder" :state="submitted? getFieldState(field.name) : formType === 'LogIn' ? null : true " />

                            <b-form-invalid-feedback v-if="submitted && getFieldState(field.name) === false">
                                {{ getRule(field.name) }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                    <slot actions>
                        <b-list-group horizontal class="gap-1 d-flex justify-content-center my-4">
                            <b-button type="submit" variant="outline-primary" :disabled="isLoading"
                                pill>S'identifier</b-button>
                            <b-button type="reset" variant="outline-secondary" :disabled="isLoading" pill>Réinitialiser
                            </b-button>
                        </b-list-group>
                    </slot>
                    <slot name="footer" />
                </b-form>
            </b-card-body>
        </b-card>
    </Loading>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { PropType } from 'vue';
import type { TField } from '@/components/Types/types';
import Loading from '@/components/Tools/Loading.vue';
import type { TAuthForm } from '@/components/Types/types';

const props = defineProps({
    submit: {
        type: Function,
        default: async () => await new Promise(r => setTimeout(r, 3000))
    },
    formType: {
        type: String as () => TAuthForm,
        default: "LogIn",
        required: true
    },
    fields: {
        type: Array as PropType<TField[]>,
        required: true
    }
});

const isLoading = ref(false)

const formData = ref<any>({});
const formErrors = ref<any>({});
const submitted = ref(false);

const initializeFormData = () => {
    props.fields.forEach((field) => {
        formData.value[field.name] = '';
    });
};

const getRule = (fieldName: string) => {
    const field = props.fields.find(f => f.name === fieldName);
    if (field && field.rules) {
        const rule = field.rules.find(r => !r.validate(formData.value[fieldName]));
        return rule ? rule.message : '';
    }
    return '';
};

const getFieldState = (fieldName: string) => {
    return (submitted.value && !formErrors.value[fieldName]) ? true : false;
};

const onSubmit = async() => {
    isLoading.value = true
    submitted.value = true;

    formErrors.value = {};

    let isValid = true;

    props.fields.forEach((field) => {
        if (field.rules) {
            const value = formData.value[field.name];
            field.rules.forEach(rule => {
                if (!rule.validate(value)) {
                    formErrors.value[field.name] = rule.message;
                    isValid = false;
                }
            });
        }
    });

    if (isValid) {
        await props.submit()
    }
    isLoading.value = false
};

const onReset = () => {
    formData.value = {};
    formErrors.value = {};
    submitted.value = false;
    initializeFormData();
};

initializeFormData();
</script>
