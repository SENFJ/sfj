<style scoped>

</style>
<template>
    <div>
        <Table v-if="row.length>0" border :columns="columns" :data="row" style="width: 100%;" :show-header="false"></Table>      
    </div>
</template>
<script>
    import util from '@/libs/util.js';
    export default {
        props: {
            row: Array
        },
        data () {
            return {
                columns: [                  
                    {
                        title: '名称',
                        key: 'title'
                    },
                    {
                        title: 'KEY',
                        key: 'name'
                    },
                    {
                        title: '图标',
                        key: 'icon'
                    },
                    {
                        title: '路由',
                        key: 'href'
                    },
                    {
                        title: '排序',
                        key: 'sort'
                    },{
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
            edit (param) {
                this.$emit('childEditData',param);                          
            },
            remove (param) {
                this.$emit('childRemoveData');
                let _self=this;
                util.post(this,'sys_menu/delData',{id:param.row.id},function(datas){             
                    _self.$emit('childRemoveSucData');  
                    _self.row.splice(param.index, 1);               
                    _self.$Message.success('删除成功！');            
                });
            },          
        }
    };  
</script>