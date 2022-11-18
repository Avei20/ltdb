<template>
    <section class="z-20 h-screen w-screen fixed top-0 left-0 bg-gray-500 opacity-50" @click="close">
</section>
<div class="absolute inset-0">
    <div class="flex h-full">
        <div class="z-30 m-auto bg-white p-2 rounded shadow w-1/3">
            <div class="p-2 border">
                <h1 class="text-2xl">
                    <slot name="title"></slot>
                </h1>
                <main>
                    <slot name="body"></slot>
                </main>
                <!-- <slot>Provide Some Data</slot> -->
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    setup(_, { emit }) {
        function close() {
            emit('close')
        }

        return { close }
    }
}
</script>