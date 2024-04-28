<template>
    <li>
        <button :class="$style.item">
            <slot />
        </button>
    </li>
</template>

<style module>
    .item {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.8);
        border-radius: 6px;
        width: 100%;
        padding: 0.2rem 0.6rem;
        display: flex;
        font-size: 2rem;
        font-weight: 700;
        align-items: center;
        border: 2px solid rgba(0, 0, 0, 0.05);
        gap: 2rem;
        transition: 0.3s ease;
        cursor: pointer;
        background: none;
    }
    @media (hover: hover) {
        .item:hover {
            text-decoration: none;
            color: rgb(230, 230, 230);
            background-color: rgba(194, 24, 7, 0.8);
        }
    }
    .item.active,
    .item:active {
        color: rgb(201, 199, 199);
        background-color: rgb(194, 24, 7);
    }
</style>
