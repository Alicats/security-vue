<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 我的产品
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="test11"
                >测试</el-button>
                <el-select v-model="query.status" placeholder="状态" class="handle-select mr10">
                    <el-option key="0" label="请选择" value="请选择"></el-option>
                    <el-option key="1" label="已通过" value="已通过"></el-option>
                    <el-option key="2" label="未通过" value="未通过"></el-option>
                </el-select>
                <el-input v-model="query.productName" placeholder="产品名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="productName" label="产品名" align="center"></el-table-column>
                <!--<el-table-column label="账户余额">-->
                    <!--<template slot-scope="scope">￥{{scope.row.money}}</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="头像(查看大图)" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-image-->
                                <!--class="table-td-thumb"-->
                                <!--:src="scope.row.thumb"-->
                                <!--:preview-src-list="[scope.row.thumb]"-->
                        <!--&gt;</el-image>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="introduce" label="简介" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <font v-if="scope.row.status === 0" color="#00bfff">未审核</font>
                        <font v-else-if="scope.row.status === 1" color="green">已通过</font>
                        <font v-else color="red">未通过</font>
                        <!--<el-tag-->
                                <!--:type="scope.row.status==='0'?'哈哈':(scope.row.status==='2'?'danger':'')"-->
                        <!--&gt;{{scope.row.status}}</el-tag>-->
                    </template>
                </el-table-column>

                <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="产品名">
                    <el-input v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input v-model="form.introduce"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MyProduct",
        data() {
            return {
                query: {
                    productName: '',
                    introduce: '',
                    createTime: '',
                    pageIndex: 1,
                    pageSize: 3
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                listLoading: false,
            };
        },
        created() {
            this.getData(this.query.pageIndex);
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData(currentPage) {
                const _this = this;
                this.$axios.get("/product/initProductTable?currentPage="+currentPage,{
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    this.tableData = res.data.data.productList;
                    this.query.pageSize = res.data.data.pageSize;
                    this.pageTotal = res.data.data.productListCount;
                })
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData(this.currentPage);
            },
            // 删除操作
            handleDelete(index, row) {
                console.log('删除');
                console.log(index);
                console.log(row);
                const _this = this;


                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        _this.listLoading = true;
                        this.$axios.delete("/product/delProduct/"+row.id,{
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then(res => {
                            _this.listLoading = false;
                            if(res.data.code === 200) {
                                _this.$message.success('删除成功');
                                _this.getData(_this.query.pageIndex);
                            }
                        })
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                const _this = this;

                _this.$axios.post("/sda",{
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res);
                })

                // this.idx = index;
                // this.form = row;
                // this.editVisible = true;
            },
            test11(){
               this.$axios.put('/product/put',{
                   headers: {
                       "Authorization": localStorage.getItem("token")
                   }
               }).then(res => {
                   console.log(res);
               })
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {

                this.$set(this.query, 'pageIndex', val);
                this.getData(val);
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>