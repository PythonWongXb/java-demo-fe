interface IDictContent {
    dictId: string;
    dictName: string;
    children: IDictContent[] | null;
}