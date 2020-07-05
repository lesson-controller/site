<template>
    <div class="col-12 row p-0 m-0">
        <div class="col-4 d-flex align-items-center" v-if="!withoutDay">
            Day:
            <b-form-input v-model="d" size="sm" type="number" @change="Change" class="ml-1"></b-form-input>
        </div>
        <div class="d-flex align-items-center" :class="{ 'col-6': withoutDay, 'col-4': !withoutDay }">
            Hour:
            <b-form-input v-model="h" size="sm" type="number" @change="Change" class="ml-1"></b-form-input>
        </div>
        <div class="d-flex align-items-center" :class="{ 'col-6': withoutDay, 'col-4': !withoutDay }">
            Min:
            <b-form-input v-model="m" size="sm" type="number" @change="Change" class="ml-1"></b-form-input>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            //type: Number,
            required: true
            //default: 0
        },
        withoutDay: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            d: 0,
            h: 0,
            m: 0,
            _value: 0
        }
    },
    methods: {
        Change() {
            var time = this.d * 86400 + this.h * 3600 + this.m * 60
            this.$emit('change', time)
        },
        Calculate() {
            if (this.value != null && this.value != undefined && this.value != NaN) this._value = this.value
            else this._value = 0
            this.d = Math.floor(this._value / 86400)
            this.h = Math.floor((this._value % 86400) / 3600)
            this.m = Math.floor((this._value % 3600) / 60)
        }
    },
    watch: {
        value() {
            this.Calculate()
        }
    },
    mounted() {
        this.Calculate()
    }
}
</script>
