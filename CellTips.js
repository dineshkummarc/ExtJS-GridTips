Ext.ns('Ext.ux.grid');

Ext.ux.grid.CellTips = function(tipCfg){
    //if function, set it as updater
    if(typeof tipCfg == 'function'){
        this.tipRenderer = tipCfg;
    }else{
        this.tipRenderer = function(grid, record, fieldName){
            return record.get(fieldName);
        }
    }
};
Ext.ux.grid.CellTips.prototype = {
    init:function(grid){
        this.grid = grid;
        this.grid.on('render', this.createTip, this);
    },
    createTip : function(){
        this.tip = new Ext.ToolTip({
            view: this.grid.getView(),
            target: this.grid.getView().mainBody,
            delegate: '.x-grid3-cell',
            trackMouse: true,
            renderTo: document.body,
            listeners: {
                beforeshow: function(tip) {
                    var el        = tip.triggerElement,
                        cellIndex = this.grid.view.findCellIndex(el),
                        rowIndex  = this.grid.view.findRowIndex(el),
                        fieldName = this.grid.colModel.config[cellIndex].dataIndex,
                        record    = this.grid.store.getAt(rowIndex),
                        update = this.tipRenderer(this.grid, record, fieldName);//return '' to hide tooltip

                        if(update !== ''){
                            tip.body.update(update);
                        }else{
                            return false;
                        }
                },
                scope:this
            }
        });
    }
};