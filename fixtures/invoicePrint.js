module.exports = {
  doctype: "PrintFormat",
  name: "Standard Invoice Format",
  for: "Invoice",
  template: `
    <h1>{{ doc.name }}</h1>
    <div class="row py-4">
        <div class="col-6">
            <div><b>{{ dataent._("Customer") }}</b></div>
            <div>{{ doc.customer }}</div>
        </div>
        <div class="col-6">
            <div><b>{{ dataent._("Date") }}</b></div>
            <div>{{ dataent.format(doc.date, 'Date') }}</div>
        </div>
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th style='width: 30px'></th>
                <th>{{ dataent._("Item") }}</th>
                <th class='text-right'>{{ dataent._("Qty") }}</th>
                <th class='text-right'>{{ dataent._("Rate") }}</th>
                <th class='text-right'>{{ dataent._("Amount") }}</th>
            </tr>
        </thead>
        <tbody>
            {% for row in doc.items %}
            <tr>
                <td class='text-right'>{{ row.idx + 1 }}</td>
                <td>{{ row.item }}<br>{{ dataent.format(row.description, 'Text') }}</td>
                <td class='text-right'>{{ row.quantity }}</td>
                <td class='text-right'>{{ dataent.format(row.rate, 'Currency') }}</td>
                <td class='text-right'>{{ dataent.format(row.amount, 'Currency') }}</td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
    <div class='row'>
        <div class='col-6'></div>
        <div class='col-6'>
            <div class='row'>
                <div class='col-6'>
                    {{ dataent._("Total") }}
                </div>
                <div class='col-6 text-right'>
                    {{ dataent.format(doc.netTotal, 'Currency')}}
                </div>
            </div>
            {% for tax in doc.taxes %}
            <div class='row'>
                <div class='col-6'>
                    {{ tax.account }} ({{ tax.rate }}%)
                </div>
                <div class='col-6 text-right'>
                    {{ dataent.format(tax.amount, 'Currency')}}
                </div>
            </div>
            {% endfor %}
            <div class='row py-3'>
                <div class='col-6'>
                    <h5>{{ dataent._("Grand Total") }}</h5>
                </div>
                <div class='col-6 text-right'>
                    <h5>{{ dataent.format(doc.grandTotal, 'Currency')}}</h5>
                </div>
            </div>
        </div>
    </div>
    <div class='py-3'>
        {{ dataent.format(doc.terms, 'Text') }}
    </div>
    `
}
