<template>
    <div :class="$style.container">
        <aside>
            <Menu>
                <Item link="/dashboard/news">
                    <NewspaperIcon :class="$style.icon" />
                    Новости
                </Item>
                <Item link="/dashboard/team">
                    <UsersIcon :class="$style.icon" />
                    Команда проекта
                </Item>
                <Item link="/dashboard/top">
                    <TrophyIcon :class="$style.icon" />
                    Зал славы
                </Item>
                <DangerButton @click="onLeave">
                    <ArrowLeftEndOnRectangleIcon :class="$style.icon" />
                    Выход
                </DangerButton>
            </Menu>
        </aside>
        <main :class="$style.main">
            <slot />
        </main>
    </div>
</template>

<style module>
    .container {
        display: grid;
        height: 100dvh;
        grid-template-columns: 20% 1fr;
    }
    .icon {
        width: 3.6rem;
        height: 3.6rem;
    }

    .main {
        padding: 1.5rem;
        height: 100%;
        align-items: stretch;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
</style>

<script setup lang="ts">
    import Menu from '@/shared/ui/Menu.vue';
    import Item from '@/shared/ui/Item.vue';
    import DangerButton from '@/shared/ui/DangerButton.vue';

    import {
        NewspaperIcon,
        UserIcon,
        UsersIcon,
        TrophyIcon,
        ArrowLeftEndOnRectangleIcon,
    } from '@heroicons/vue/16/solid';

    const onLeave = async () => {
        await $fetch('/api/logout');

        navigateTo('/login');
    };
</script>
