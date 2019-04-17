<template>
    <v-container fluid>
        <!-- <v-layout> -->
            <h1>Colors Page</h1>
<v-layout>
    <v-flex>
        <div class="primary">PRIMARY</div>
        <div class="secondary">SECONDARY</div>
        <div class="accent">ACCENT</div>
        <div class="error">ERROR</div>
        <div class="info">INFO</div>
        <div class="success">SUCCESS</div>
        <div class="warning">WARNING</div>
<br><br>
        <div class="new-primary">PRIMARY</div>
        <div class="new-secondary">SECONDARY</div>
        <div class="new-accent">ACCENT</div>
        <div class="new-error">ERROR</div>
        <div class="new-info">INFO</div>
        <div class="new-success">SUCCESS</div>
        <div class="new-warning">WARNING</div>
</v-flex>
</v-layout>
        <!-- </v-layout> -->
    </v-container>
</template>
<script>
export default {
    name: 'colors'
};
</script>

<style lang="scss">
.new-primary {
    background-color: #283f3b ;
}
.new-secondary {
    background-color: #3b7080;
}
.new-accent {
    background-color: #e4572e;
}
.new-error {
    background-color: #461220;
}
.new-info {
    background-color: #f6d8ae;
}
.new-success {
    background-color: #ade25d;
}
.new-warning {
    background-color: #4b3b40;
}
</style>
