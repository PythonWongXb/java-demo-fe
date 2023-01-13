#!/bin/bash
#
# Copyright (c) 2018 Baidu.com, Inc. All Rights Reserved
#
# Author: lijia19(lijia19@baidu.com)
# Date: 2017-11-23
# Brief:
#   Build for agile. Will be called from BCLOUD
#
# export PATH=$NODEJS_BIN_LATEST:$YARN_BIN_LATEST:$PATH
export PATH=$NODEJS_16_10_0_BIN:$YARN_BIN_LATEST:$PATH
echo "Compile project::$(pwd)"
echo "node: $(node -v)"
# icode project name
readonly PROJNAME='biz-crm-fe-toker'
# code build folder(eg: dist or build)
readonly BUILD_FOLDER='dist'
readonly TEST_OUTPUT=output/${PROJNAME}
readonly ONLINE_OUTPUT=output/online/${PROJNAME}
readonly PREONLINE_OUTPUT=output/preonline/${PROJNAME}
# output folder(eg: output/fc-vip-fe)
# readonly OUTPUT=output
OUTPUT=output/${PROJNAME}
# readonly OUTPUTNAME=output/dist
function procedure_check() {
    [[ "$?" != "0" ]] && exit $?
    return 0
}
function install() {
    echo "pnpm $(pnpm -v)"
    pnpm install --production=false
    pnpm list --depth=0
}
function build() {
    echo $NODE_ENV
    if [ $NODE_ENV == 'test' ];then
        buildOnEnv 'test'
    elif [ $NODE_ENV == 'production' ];then
        buildOnEnv 'online'
        buildOnEnv 'pre'
    fi
}

function buildSourceMap
{
    cd $1/static
    echo '--start pack SourceMap tar--'
    ls
    tar -czf sourcemap.tar.gz *.js *.js.map
    npx @baidu/weirwood-cli -c weirwood.json
    rm *.js.map
    rm sourcemap.tar.gz
    cd ../../
    echo '--finish pack SourceMap tar--'
}

function buildOnEnv() {
    echo $1
    if [[ $1 == 'online' ]];then
        OUTPUT=${ONLINE_OUTPUT}
    elif [[ $1 == 'pre' ]];then
        OUTPUT=${PREONLINE_OUTPUT}
    else
        OUTPUT=${TEST_OUTPUT}
    fi
    echo ${OUTPUT}
    ## tip: Do not support pass env params when build
    pnpm run build:"$1" || procedure_check
    # 处理sourcemap
    # buildSourceMap ${BUILD_FOLDER}
    echo '--build finish--'
    echo '--start pack tar--'
    # pack the output
    mkdir -p ${OUTPUT}/app_script_static
    ls ${BUILD_FOLDER}
    mv ${BUILD_FOLDER}/* ${OUTPUT}/app_script_static
    # zip -r ${OUTPUTNAME}.zip ${BUILD_FOLDER} || procedure_check
    tar -zcf ${OUTPUT}.tar.gz -C ${OUTPUT} . || procedure_check
    rm -rf ${OUTPUT}
    echo '--finish pack tar--'
}

function main() {
    install || procedure_check
    build || procedure_check
}
main "$@"
