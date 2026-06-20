package vastra_backend.responseDTO;

import lombok.Data;
import vastra_backend.enums.Size;

@Data
public class ProductVariantResponse {

    private Size size;
    private int stock;

}
